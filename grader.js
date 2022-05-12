const gradeContainer = document.createElement('div');
gradeContainer.style.position = 'absolute';
gradeContainer.style.maxWidth = '300px';
gradeContainer.style.right = '30px';
gradeContainer.style.top = '30px';
document.querySelector('body').appendChild(gradeContainer);

// Share link input field
const serverPortLabel = document.createElement('label');
serverPortLabel.textContent = 'local server port number (default: 3000)';
const serverPortInput = document.createElement('input');
serverPortInput.setAttribute('type', 'text');
serverPortInput.placeholder = '3000';
serverPortInput.value = '3000';

// Share link input field
const shareLinkInputLabel = document.createElement('label');
shareLinkInputLabel.textContent = 'Id of generated sharing link';
const shareLinkInput = document.createElement('input');
shareLinkInput.setAttribute('type', 'text');
shareLinkInput.placeholder = 'share-link';

// User Defined Sharing Id
const userDefinedSharingIdLabel = document.createElement('label');
userDefinedSharingIdLabel.textContent = 'Id of User Defined Sharing Id input (e.g. user-defined-id)';
const userDefinedSharingIdInput = document.createElement('input');
userDefinedSharingIdInput.setAttribute('type', 'text');
userDefinedSharingIdInput.placeholder = 'user-defined-id';

// Generate User Defined Sharing Link
const generateUserDefinedSharingLinkLabel = document.createElement('label');
generateUserDefinedSharingLinkLabel.textContent =
    'Id of button to generate link with user defined sharing id (e.g. user-defined-generate)';
const generateUserDefinedSharingLinkInput = document.createElement('input');
generateUserDefinedSharingLinkInput.setAttribute('type', 'text');
generateUserDefinedSharingLinkInput.placeholder = 'user-defined-generate';

// Delete Expired Ids
const deleteExpiredIdLabel = document.createElement('label');
deleteExpiredIdLabel.textContent = 'Id of button to delete expired sharing id (e.g. delete-expired)';
const deleteExpiredIdButtonInput = document.createElement('input');
deleteExpiredIdButtonInput.setAttribute('type', 'text');
deleteExpiredIdButtonInput.placeholder = 'delete-expired';

const labelAndInputs = [
    [serverPortLabel, serverPortInput],
    [shareLinkInputLabel, shareLinkInput],
    [userDefinedSharingIdLabel, userDefinedSharingIdInput],
    [generateUserDefinedSharingLinkLabel, generateUserDefinedSharingLinkInput],
    [deleteExpiredIdLabel, deleteExpiredIdButtonInput],
];

// The form
const infoForm = document.createElement('form');

labelAndInputs.forEach(([label, input]) => {
    const p = document.createElement('p');
    p.style.display = 'flex';
    p.style.flexDirection = 'column';

    p.appendChild(label);
    p.appendChild(input);

    infoForm.appendChild(p);
});
gradeContainer.appendChild(infoForm);

// Populate with cache
const storageKeys = [
    ['portNumber', serverPortInput],
    ['shareLink', shareLinkInput],
    ['userKeyInput', userDefinedSharingIdInput],
    ['userKeyButton', generateUserDefinedSharingLinkInput],
    ['deleteButton', deleteExpiredIdButtonInput],
];
storageKeys.forEach(([key, input]) => {
    input.required = true;
    const value = localStorage.getItem(key);
    if (!value) return;
    input.value = value;
});

// Grade button
const gradeButton = document.createElement('button');
gradeButton.textContent = 'Grade 💯';
gradeButton.style.fontSize = '2em';
gradeButton.style.margin = '20 0';
gradeContainer.appendChild(gradeButton);

// Monkey patch functions
const EVENTS = {
    SET_SHARE_LINK: 'set-share-link',
    DELETE_COMPLETE: 'delete-complete',
};

const _setShareLinkInInputField = setShareLinkInInputField;
setShareLinkInInputField = function (...args) {
    _setShareLinkInInputField(...args);
    document.dispatchEvent(new Event(EVENTS.SET_SHARE_LINK));
};

const _deleteComplete = deleteComplete;
deleteComplete = function (...args) {
    _deleteComplete(...args);
    document.dispatchEvent(new Event(EVENTS.DELETE_COMPLETE));
};

function listenForCustomEvent(event, message = 'Test took too long to execute', element = document, delay = 10000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(message)), delay);
        element.addEventListener(event, () => {
            clearTimeout(timer);
            return resolve();
        });
    });
}

function timeoutPromise(resolvedValue, duration = 6000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => (resolvedValue.error ? reject(resolvedValue) : resolve(resolvedValue)), duration);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const generatedModules = {};
function generateModules(n = 5) {
    const moduleNameInput = document.querySelector('#module-name');
    const creditUnitInput = document.querySelector('#credit');
    const gradeInput = document.querySelector('#grade');
    const createModuleButton = document.querySelector('#new-module-form button');

    for (let i = 0; i < n; i++) {
        moduleNameInput.value = makeId(4);
        creditUnitInput.value = getRandomInt(4, 7);
        gradeInput.value = getRandomInt(4, 9) / 2;
        createModuleButton.click();
        generatedModules[moduleNameInput.value] = { credit: creditUnitInput.value, grade: gradeInput.value };
    }
}

const userDefinedInputStatus = {
    beforeSend: null,
    pending: null,
    complete: null,
};
const userDefinedButtonStatus = {
    beforeSend: null,
    pending: null,
    complete: null,
};

const expectedUserDefinedControlsIsDisabled = [
    ['beforeSend', false],
    ['pending', true],
    ['complete', false],
];

function initTests() {
    const randomKey = makeId(10);

    function updateUserDefinedControlIsDisabled(event) {
        const userDefinedIdInput = document.getElementById(userDefinedSharingIdInput.value);
        const userDefinedSubmitButton = document.getElementById(generateUserDefinedSharingLinkInput.value);
        userDefinedInputStatus[event] = userDefinedIdInput.disabled;
        userDefinedButtonStatus[event] = userDefinedSubmitButton.disabled;
        console.log(userDefinedInputStatus);
    }

    function getStorageUrl(key, expireDuration = 1) {
        const port = +serverPortInput.value;
        return `http://localhost:${port}/storage?key=${key}&expireDuration=${expireDuration}`;
    }

    function allowUserDefinedSharingId() {
        const userDefinedIdInput = document.getElementById(userDefinedSharingIdInput.value);
        const userDefinedSubmitButton = document.getElementById(generateUserDefinedSharingLinkInput.value);
        const generatedLinkInput = document.getElementById(shareLinkInput.value);

        userDefinedIdInput.value = randomKey;

        const resultPromise = listenForCustomEvent(EVENTS.SET_SHARE_LINK)
            .then(function () {
                const url = new URL(generatedLinkInput.value);
                const searchParams = url.searchParams;
                const key = searchParams.get('key');
                if (key === randomKey) {
                    return key;
                } else {
                    throw new Error(`Returned key (${key}) does not match given key (${randomKey})`);
                }
            })
            .then((key) => fetch(getStorageUrl(key)))
            .then((res) => res.json())
            .then((json) =>
                json.every(
                    ({ name, credit, grade }) =>
                        generatedModules[name]?.credit === credit && generatedModules[name]?.grade === grade,
                ),
            )
            .then((result) => {
                if (!result) return { error: 'Stored module does not match expected modules' };
            })
            .finally(() => updateUserDefinedControlIsDisabled(expectedUserDefinedControlsIsDisabled[2][0]));

        updateUserDefinedControlIsDisabled(expectedUserDefinedControlsIsDisabled[0][0]);
        userDefinedSubmitButton.click();
        updateUserDefinedControlIsDisabled(expectedUserDefinedControlsIsDisabled[1][0]);
        return resultPromise;
    }

    async function userDefinedControlsShouldBeDisabled() {
        const useDefinedInputIsDisabledCorrectly = expectedUserDefinedControlsIsDisabled.every(
            ([key, value]) => userDefinedInputStatus[key] === value,
        );
        const useDefinedButtonIsDisabledCorrectly = expectedUserDefinedControlsIsDisabled.every(
            ([key, value]) => userDefinedButtonStatus[key] === value,
        );
        if (!useDefinedInputIsDisabledCorrectly || !useDefinedButtonIsDisabledCorrectly) {
            throw { error: 'User defined controls not disabled correctly' };
        }
    }

    async function duplicateKeyShouldReject() {
        return fetch(getStorageUrl(randomKey), {
            method: 'POST',
            body: JSON.stringify({ error: 'I should not be added' }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 400) {
                return true;
            } else {
                throw new Error(`Reused, unexpired key (${randomKey}, from first test) not rejectedd`);
            }
        });
    }

    const secondsToWait = 2;
    const expiryDuration = (secondsToWait - 1) / (24 * 60 * 60);

    const expiringRandomKey = makeId(10);
    const createUrl = getStorageUrl(expiringRandomKey, expiryDuration);
    const createOptions = {
        method: 'POST',
        body: JSON.stringify({ key: expiringRandomKey }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    async function shouldDeleteExpiredKey() {
        return fetch(createUrl, createOptions)
            .then((response) => {
                if (response.status !== 201) {
                    response.json().then((json) => console.error(json));
                    throw new Error(`Something else went wrong during first insertion | key: ${expiringRandomKey}`);
                }
            })
            .then(() => timeoutPromise({}, secondsToWait * 1000)) //milliseconds
            .then(() => document.getElementById(deleteExpiredIdButtonInput.value).click())
            .then(() =>
                listenForCustomEvent(
                    EVENTS.DELETE_COMPLETE,
                    `Test took too long to complete | Did you call "deleteComplete()"?`,
                ),
            ) //milliseconds
            .then(() => fetch(createUrl, createOptions))
            .then((response) => {
                if (response.status !== 201) {
                    response.json().then((json) => console.error(json));
                    throw new Error(
                        `Failed to create with even after deleting expired key | key: ${expiringRandomKey}`,
                    );
                }
            });
    }

    const criterias = [
        [
            `Entering the custom key into the input field and pressing generate should generate a link with the key <b>${randomKey}</b> as <b style="color: red">query parameter</b> that retrieves the generated modules`,
            allowUserDefinedSharingId,
        ],
        [
            `While the link is being generated, all input fields and buttons should be <b  style="color: red">disabled</b> to indicate that it is loading`,
            userDefinedControlsShouldBeDisabled,
        ],
        [
            `The key  <b>${randomKey}</b> should <b style="color: red">NOT</b> be allowed to re-use since it has not yet expired`,
            duplicateKeyShouldReject,
        ],
        [
            `Clicking the delete button should delete <b>${expiringRandomKey}</b> which is added with expiry duration of 2s and allow re-insertion`,
            shouldDeleteExpiredKey,
        ],
    ];

    return criterias;
}

const criterias = initTests();

const statusEnum = {
    PENDING: '🔸',
    RUNNING: '⏳',
    SUCCESS: '✔️',
    FAIL: '❌',
    CANCELLED: '✖️',
};

const checklist = document.createElement('ol');
checklist.style.fontSize = '1em';
checklist.style.paddingLeft = 20;
criterias.forEach(([description], index) => {
    const listItem = document.createElement('li');
    const statusSpan = document.createElement('span');
    statusSpan.textContent = statusEnum.PENDING;
    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerHTML = description;
    listItem.appendChild(statusSpan);
    listItem.appendChild(descriptionSpan);
    checklist.appendChild(listItem);
    listItem.style.marginBottom = '20px';
    criterias[index][2] = statusSpan;
});

gradeContainer.appendChild(checklist);

gradeButton.onclick = async function () {
    if (!Object.keys(generatedModules).length) generateModules(5);

    const allInputExists = storageKeys.every(([key, input]) => {
        const value = input.value;
        if (!input.reportValidity()) return false;
        localStorage.setItem(key, value);
        return true;
    });
    if (!allInputExists) return;

    criterias.forEach(([_, __, descriptionSpan]) => {
        descriptionSpan.textContent = statusEnum.RUNNING;
    });

    let failed = false;
    for (let i = 0; i < criterias.length; i++) {
        const [_, testRunner, statusSpan] = criterias[i];

        if (failed) {
            statusSpan.textContent = statusEnum.CANCELLED;
            continue;
        }

        try {
            await testRunner();
            statusSpan.textContent = statusEnum.SUCCESS;
        } catch (error) {
            statusSpan.textContent = statusEnum.FAIL;
            failed = true;
            console.log(error);
            continue;
        }
    }
};

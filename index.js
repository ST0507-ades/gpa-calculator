const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = false ? `http://localhost:3000` : `https://keyval-store.herokuapp.com`;
const letterGrades = {
    4: 'A',
    3.5: 'B+',
    3: 'B',
    2.5: 'C+',
    2: 'C',
    1.5: 'D+',
    1.0: 'D',
    0.5: 'D-',
    0: 'F',
};
const modules = {};

function setShareLinkInInputField(inputField, key) {
    const url = new URL(window.location.href);
    url.searchParams.set('key', key);
    inputField.value = url.toString();
}

function deleteComplete() {
    // empty function
    // Call this function after you're sure that deletion is completed
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
function makeId(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

window.addEventListener('DOMContentLoaded', function () {
    // Table
    const moduleTableBody = document.querySelector('#module-table tbody');
    const moduleRowTemplate = document.querySelector('#module-row-template');

    // Result
    const gpaResult = document.querySelector('#gpa-result');
    const chickenRiceResult = document.querySelector('#chicken-rice-result');

    // Add module
    const addModuleForm = document.querySelector('#new-module-form');
    const moduleNameInput = addModuleForm.querySelector('#module-name');
    const creditInput = addModuleForm.querySelector('#credit');
    const gradeInput = addModuleForm.querySelector('#grade');

    // Generate sharing link
    const generateLinkButton = document.querySelector('#generate-link');
    const shareLinkInput = document.querySelector('#share-link');
    const timeGeneratedField = document.querySelector('#time-generated');

    // All intractable controls (e.g. input, buttons, etc...)
    const controls = [
        addModuleForm.querySelector('button'),
        moduleNameInput,
        creditInput,
        gradeInput,
        generateLinkButton,
    ];

    /**
     * Disable controls in page
     */
    function disablePage() {
        controls.forEach((control) => (control.disabled = true));
    }

    /**
     * Enables controls in page
     */
    function enablePage() {
        controls.forEach((control) => (control.disabled = false));
    }

    /**
     * Create a new row with delete button
     */
    function createRow(moduleName, credit, grade, onDelete) {
        const newRow = moduleRowTemplate.content.firstElementChild.cloneNode(true);
        newRow.querySelector('.row-name').textContent = moduleName;
        newRow.querySelector('.row-credit').textContent = credit;
        newRow.querySelector('.row-grade').textContent = grade;
        newRow.querySelector('.row-delete').onclick = () => onDelete(newRow);
        return newRow;
    }

    /**
     * Create a new row and update modules object
     */
    function createModuleWithId(moduleName, credit, grade) {
        const id = makeId(10);
        modules[id] = { name: moduleName, credit, grade };
        addRow(moduleName, credit, grade);
    }

    /**
     * Create an array of module based on the table
     */
    function getModules() {
        return getRows();
    }

    /**
     * Compute GPA based on the modules provided
     */
    function computeGpa(modules) {
        let totalCredit = 0;
        let totalScore = 0;
        modules.forEach((module) => {
            const { credit, grade } = module;
            totalScore += credit * grade;
            totalCredit += credit;
        });
        if (totalCredit === 0) return 0;
        return totalScore / totalCredit;
    }

    /**
     * Computes GPA based on the modules in the table and update the result
     */
    function updateResult() {
        const modules = getModules();
        const gpa = computeGpa(modules);
        const canBuyChickenRice = gpa >= 3.5;
        gpaResult.textContent = gpa.toFixed(2);
        chickenRiceResult.textContent = canBuyChickenRice ? 'YES' : 'NO';
    }

    /**
     * Add a new row to the table.
     */
    addModuleForm.onsubmit = function (e) {
        e.preventDefault();
        const moduleName = moduleNameInput.value;
        const credit = +creditInput.value;
        const grade = +gradeInput.value;

        createModuleWithId(moduleName, credit, grade);
        updateResult();
        return false;
    };

    /**
     * Uploads modules data to storage and generate sharing link based on returned key
     */
    generateLinkButton.onclick = function (e) {
        e.preventDefault();
        disablePage();
        const modules = getModules();
        fetch(`${STORAGE_API_HOST}/storage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modules),
        })
            .then((response) => response.json())
            .then((json) => {
                setShareLinkInInputField(shareLinkInput, json.key);
                timeGeneratedField.textContent = new Date().toLocaleString();
            })
            .catch((error) => alert(error.message))
            .finally(() => enablePage());
    };

    /**
     * Loads modules data from storage and populate page
     */
    function loadDataFromKey(key) {
        disablePage();
        fetch(`${STORAGE_API_HOST}/storage?key=${key}`)
            .then((response) => response.json())
            .then((json) => {
                json.forEach((module) => {
                    const { name: moduleName, credit, grade } = module;
                    createModuleWithId(moduleName, credit, grade);
                });
                updateResult();
            })
            .catch((error) => alert(error.message))
            .finally(() => enablePage());
    }

    /**
     * Check for key in url and loads module data
     */
    const currentUrl = new URL(window.location.href);
    const key = currentUrl.searchParams.get('key');
    if (key) loadDataFromKey(key);
});

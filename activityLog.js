// activityLog.js

const logActivity = (message) => {
    const logContainer = document.getElementById('activityLog');
    const logMessage = document.createElement('div');
    logMessage.textContent = `[${new Date().toLocaleString()}] ${message}`;
    logContainer.appendChild(logMessage);
};

function createActivityLogContainer() {
    const logContainer = createElement('div', {
        id: 'activityLog',
        classList: ['bg-gray-100', 'p-4', 'shadow', 'rounded', 'mt-6']
    });
    logContainer.appendChild(createElement('h2', {
        classList: ['text-xl', 'font-bold', 'mb-4'],
        text: 'Activity Log'
    }));
    return logContainer;
}

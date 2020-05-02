const sessionKey = 'sessionKey';


function getSession() {
    const stringifedSession = localStorage.getItem(sessionKey);
    if (stringifedSession) {
        return parseInt(stringifedSession, 10);
    }
}

function storeSession(Milliseconds) {
    localStorage.setItem(sessionKey, JSON.stringify(Milliseconds));
}
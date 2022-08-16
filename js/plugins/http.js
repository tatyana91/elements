const BASE_URL = '/api/references/';

export async function request(url, options){
    let response = await fetch(BASE_URL + url, options);
    if (response.ok) {
        return await response.json();
    }
    else if (response.status !== 403){
        alert('Error');
        return false;
    }
}

export async function postRequest(url, data){
    let response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return await response.json();
    }
    else if (response.status !== 403){
        alert('Error');
        return false;
    }
}

export async function putRequest(url, data){
    let response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return await response.json();
    }
    else if (response.status !== 403){
        alert('Error');
        return false;
    }
}

export async function deleteRequest(url, data){
    let response = await fetch(BASE_URL + url, {
        method: 'DELETE'
    });
    if (response.ok) {
        return await response.json();
    }
    else if (response.status !== 403){
        alert('Error');
        return false;
    }
}

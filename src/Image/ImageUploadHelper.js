const backendURL = "http://localhost:8080/image/"

export const postImageToServer = (file, resultCallback) => {
    let formData = new FormData();
    formData.append('file', file);
    fetch(backendURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formData
    })
        .then(results => {
            return results.json();
        })
        .then(data => {
            console.log(data);
            resultCallback(backendURL + data.targetFileName);
        })
        .catch((error) => {
            console.log(error)
        });
}
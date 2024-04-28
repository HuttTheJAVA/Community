function submitActivate(){
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const submitButton = document.getElementById("submit")
    if(title && content){
        submitButton.style.backgroundColor = "#7F6AEE";
    }else{
        submitButton.style.backgroundColor = "#ACA0EB";
    }
}

function checkValidation(){
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    document.getElementById('postHelper').innerHTML = '';

    if(!title || !content){
        document.getElementById('postHelper').innerHTML = "*제목,내용을 모두 작성해주세요"
    }else{
        const jsonData = {
            title: title,
            content: content
        };
        alert("게시글 등록 완료!");
        // 이 코드는 백엔드 서버에서 구현하자.
        // fetch('/saveData',{
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify(jsonData)
        // })
        // .then(response=>response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    }
}

document.getElementById("title").addEventListener('input',submitActivate);

document.getElementById("content").addEventListener('input',submitActivate);

document.getElementById("submit").addEventListener('click',checkValidation);
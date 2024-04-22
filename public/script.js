// 폼과 버튼 요소 가져오기
const form = document.getElementById('myForm');
const textInput1 = document.getElementById('textInput1');
const textInput2 = document.getElementById('textInput2');
const submitButton = document.getElementById('submitButton');

// 첫 번째 입력 필드의 유효성을 검사하고 제출 버튼의 색을 변경하는 함수
function checkValidityAndChangeColor1() {
  if (textInput1.value.trim() !== '') {
    submitButton.style.backgroundColor = 'green'; // 유효한 경우 녹색
  } else {
    submitButton.style.backgroundColor = 'red'; // 유효하지 않은 경우 빨간색
  }
}

// 두 번째 입력 필드의 유효성을 검사하고 제출 버튼의 색을 변경하는 함수
function checkValidityAndChangeColor2() {
  const pattern = /^[0-9]+$/; // 숫자만 허용하는 패턴
  if (pattern.test(textInput2.value.trim())) {
    submitButton.style.backgroundColor = 'green'; // 유효한 경우 녹색
  } else {
    submitButton.style.backgroundColor = 'red'; // 유효하지 않은 경우 빨간색
  }
}

// 각 입력이 변경될 때마다 색 변경 함수 호출
textInput1.addEventListener('input', checkValidityAndChangeColor1);
textInput2.addEventListener('input', checkValidityAndChangeColor2);

// 폼 제출 시 색 변경 함수 호출
form.addEventListener('submit', function(event) {
  event.preventDefault(); // 폼의 기본 동작 방지
  checkValidityAndChangeColor1(); // 첫 번째 입력 필드의 유효성 검사
  checkValidityAndChangeColor2(); // 두 번째 입력 필드의 유효성 검사
});

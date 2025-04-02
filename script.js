const students = {
    "1반": ["고유주", "권성준", "김세준", "김수현", "김윤건", "김태욱", "김하랑", "송도협", "송지호", "안준성", "우진석", "윤지우", "이윤비", "이지율", "이하율", "이혜원", "이호찬", "임주완", "임태후", "장은진", "정하경", "정하윤", "최현영", "하지원", "허지민"],
    "2반": ["강혜정", "구태양", "김동현", "김수아", "김현서", "김현율", "노희주", "문다솔", "박현서", "서효권", "윤우현", "이강우", "이민준", "이예준", "이은후", "장은주", "전은솔", "정은성", "채민석", "최민주", "최수아", "최지호", "한은수", "한지민", "홍영은", "황시현"],
    "3반": ["구준", "김관희", "김다은", "김도균", "김산", "김서연", "김서은", "김소연", "김태성", "김한결", "남예진", "노유림", "오민정", "오은송", "유건우", "윤승연", "이서준", "전예담", "정승기", "조부건", "조성훈", "조예준", "진소희", "채윤찬", "최우주", "황정하"],
    "4반": ["김다영", "김성훈", "나건후", "배승민", "성민수", "신주영", "신주하", "안유진", "양수빈", "오건우", "유채아", "이누리", "이도훈", "이정후", "이하율", "이현성", "임재민", "전지황", "정민우", "정선웅", "정예린", "정조은", "최수빈", "최재우", "한지헌", "홍주환"],
    "5반": ["구본율", "국수연", "김동현", "김문준", "김승환", "김시온", "김시우", "김우진", "김유진", "김정훈", "배예지", "송태윤", "신비", "양서윤", "유진규", "이민혁", "이서은", "이시우", "이정훈", "조비우", "조수빈", "주하진", "최수민", "최현서", "황수아"],
    "6반": ["고범서", "김나영", "김지후", "김하민", "김하율", "김현수", "나형준", "박시후", "신혜원", "유재혁", "이건희", "이다비", "이성연", "이은유", "임도훈", "임빛", "전재현", "정서희", "정유빈", "정태연", "정하린", "조찬형", "차재민", "최에스더", "최은찬", "한지윤"],
    "7반": ["강수경", "김가연", "김민서", "김수찬", "김유정", "김진우", "문승리", "박지원", "박현성", "박혜윤", "서지안", "송시현", "유진성", "유태훈", "이도영", "이민진", "이시헌", "이아린", "정서우", "정은빈", "정주한", "채린", "최정수", "최하민", "허진혁", "홍라희"]
};

const buttonsDiv = document.getElementById("buttons");
const timerDiv = document.getElementById("timer");
const resultDiv = document.getElementById("result");
const beepSound = document.getElementById("beep");

// 반별 버튼 생성
Object.keys(students).forEach(ban => {
    const button = document.createElement("button");
    button.innerText = `${ban}`;
    button.classList.add("px-6", "py-3", "text-lg", "font-semibold", "text-white", "bg-indigo-500", "rounded-lg", "shadow-md", "hover:bg-indigo-600", "transition");
    button.onclick = () => startGrouping(ban);
    buttonsDiv.appendChild(button);
});

// 모둠 짜기 함수
function startGrouping(ban) {
    let shuffled = students[ban].sort(() => 0.5 - Math.random());
    let groups = Array.from({ length: 6 }, () => []);

    shuffled.forEach((student, index) => {
        groups[index % 6].push(student);
    });

    showCountdown(() => displayGroups(groups));
}

// 타이머 실행
function showCountdown(callback) {
    let count = 3;
    timerDiv.innerText = count;
    timerDiv.classList.remove("hidden", "animate-pulse");
    beepSound.play();

    let interval = setInterval(() => {
        count--;
        timerDiv.innerText = count;
        if (count === 0) {
            clearInterval(interval);
            timerDiv.classList.add("hidden");
            callback();
        }
    }, 1000);
}

// 모둠 결과 표시
function displayGroups(groups) {
    resultDiv.innerHTML = groups.map((g, i) => `
        <div class="group-card">
            <h2 class="group-title"> ${i + 1}조</h2>
            <p class="group-members">${g.join(", ")}</p>
        </div>
    `).join("");
}

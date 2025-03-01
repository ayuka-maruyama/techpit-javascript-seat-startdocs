/**
 * 参加者の名前リストを取得し、欠席者を取り除く
 * @return {Array} 席替え対象の名前リスト
 */
const setTargetParticipants = () => {
    let studentNamesInput = document.querySelector('#studentNames').value;
    let studentNamesList = studentNamesInput.split('、').map((name) => name.trim()); // カンマ区切りで配列化

    const absenteeNames = document.querySelector('#absence').value;
    const absenteeList = absenteeNames.split('、').map((name) => name.trim());

    // 欠席者を除外
    studentNamesList = studentNamesList.filter((name) => !absenteeList.includes(name));

    return studentNamesList;
};

/**
 * 席替え用の名前リストをシャッフル
 * @param {Array} participantList
 * @return {Array} シャッフル後のリスト
 */
const shuffleArray = (participantList) => {
    for (let i = participantList.length; i > 0; i--) {
        const randomNum = Math.floor(Math.random() * i);
        let tmp = participantList[i - 1];
        participantList[i - 1] = participantList[randomNum];
        participantList[randomNum] = tmp;
    }
    return participantList;
};

/**
 * シャッフルされた参加者の名前を画面に表示
 * @param {Array} shuffleParticipants
 */
const showSeatBoxes = (shuffleParticipants) => {
    let insertHTML = '';
    shuffleParticipants.forEach((name) => {
        insertHTML += `<div class="seat__item">${name}</div>`;
    });
    document.querySelector('#seat').innerHTML = insertHTML;
};

/**
 * @type {Function} timer ・・・・ setInterval関数が格納されている
 * @type {Object} audioElement ・・・ 音声データとなるもの
 */
const soundPlay = (timer) => {
    const audioElement = new Audio();
    audioElement.src = 'assets/audio/drum.mp3';
    audioElement.play();

    audioElement.addEventListener('ended', function () {
        clearInterval(timer);
    });
};

/**
 * 席替えスタートボタンの動作
 */
document.querySelector('#btn-start').addEventListener('click', () => {
    const studentNamesInput = document.querySelector('#studentNames').value;

    if (studentNamesInput.trim() === '') {
        alert('参加者の名前を入力してください！');
        return false;
    }

    document.querySelector('.c-overlay').classList.add('is-closed');

    const participantList = setTargetParticipants();

    const timer = setInterval(() => {
        const shuffleParticipants = shuffleArray(participantList);
        showSeatBoxes(shuffleParticipants);
    }, 50);

    soundPlay(timer);
});

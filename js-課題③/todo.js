const lists = [];
function add() {
// 入力された値、tbody内の情報を取得 ▶︎ tbodyの中を空に
    const content = document.getElementById('content');
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
// 入力された値をlists配列に追加
    const add = {content: content.value, status: 0}
    lists.push(add);
    roop();
}

// 配列の中身をループ処理
function roop() {
    lists.forEach((list, i) => {   
    // 繰り返し時のインデックス値を表示             
        const newList = tbody.insertRow();
        const numCell = newList.insertCell();
        const listNum = document.createTextNode(i);
        numCell.appendChild(listNum);
    // 配列"lists"の"content"オブジェクトから要素を取得
        const todoCell = newList.insertCell();
        const todo = document.createTextNode(list.content);
        todoCell.appendChild(todo);
    // 配列"lists"の"status"オブジェクトの要素による、条件分岐
        const statusCell = newList.insertCell();
        const statusButt = document.createElement('button');
        const statusId = list.status;
        statusButt.id = i;
        statusButt.addEventListener("click", {id: statusButt.id, handleEvent: status}, false);
        if (statusId === 0) {
            statusButt.textContent = '作業中';
        } else {
            statusButt.textContent = '完了';
        }
        statusCell.appendChild(statusButt);

    // 削除ボタンの設置
        const delCell = newList.insertCell();
        const delButt = document.createElement('input');
        delButt.type = 'button';
        delButt.value = '削除';
        delButt.id = i;
        delButt.addEventListener("click", {id: delButt.id, handleEvent: del}, false);
        delCell.appendChild(delButt);
    });   
}

function del(id) {
    const delId= id.target.id;
    lists.splice(delId, 1);

    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    roop();
}

function status(id) {
    const statusId= id.target.id;
    const staArr= lists[statusId];
    if (staArr.status === 0) {
        staArr.status = 1;
    } else {
        staArr.status = 0;
    }
    tbody.innerHTML = '';
    roop();
};
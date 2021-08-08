const lists = [];
// 新規todoを追加する際の処理
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



// todoを表示させる処理
function roop() {
    lists.forEach((list, i) => {   
        const statusId = list.status;       
        const newList = tbody.insertRow();
        if (statusId === 0) {
            newList.classList.add('work');
        } else if (statusId === 1){
            newList.classList.add('finish');
        }
        filter();
        // インデックス値の代入 
        const numCell = newList.insertCell();
        const listNum = document.createTextNode(i);
        numCell.appendChild(listNum);
        // todoのコンテンツ用セルの追加
        const todoCell = newList.insertCell();
        const todo = document.createTextNode(list.content);
        todoCell.appendChild(todo);
        // statusButtonの設置
        const statusCell = newList.insertCell();
        const statusButt = document.createElement('button');
        statusButt.id = i;
        statusButt.addEventListener("click", {id: statusButt.id, handleEvent: status}, false);
    // statusButtonの条件分岐    
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
    content.value = '';
    
}

// 削除ボタンが押された時の処理
function del(id) {
    const delId= id.target.id;
    lists.splice(delId, 1);

    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    roop();
}

// todoの完了・未完了のボタンが押された時の処理
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
}

// 表示切り替えテスト
function filter() {
    const option = document.getElementsByName('select'); //ラジオボタンの取得
    const workingTasks = document.querySelectorAll('.work');
    const finishTasks = document.querySelectorAll('.finish');    
        
        if (option[1].checked) {
            workingTasks.forEach(element => {
                element.style.display = '';
            });
            finishTasks.forEach(element => {
                element.style.display = 'none';
            });
        } else if (option[2].checked) {
            workingTasks.forEach(element => {
                element.style.display = 'none';
            });
            finishTasks.forEach(element => {
                element.style.display = '';
            });
        } else {
            workingTasks.forEach(element => {
                element.style.display = '';
            });
            finishTasks.forEach(element => {
                element.style.display = '';
            });
        }
};
   
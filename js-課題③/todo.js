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
        newList.classList.add('show');
        if (statusId === 0) {
            newList.id = 'unCompletes'+i;
        } else if (statusId === 1){
            newList.id = 'Completes'+i;
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
    const radioButtAll = document.getElementById('all');
    const radioButtWorking = document.getElementById('working');
    const radioButtDone = document.getElementById('done');

    const tableBody = document.getElementById('tbody');
    const row = tableBody.rows.length;
    for (let i = 0; i < row; i++) {

        if (radioButtAll.checked) {
            const uncompleteRow = document.getElementById('unCompletes'+i);
                if (uncompleteRow !== null) {
                    const unCompClass = uncompleteRow.classList.contains('displayNone');                
                    if (unCompClass === true) {
                        uncompleteRow.classList.replace('displayNone', 'show');
                    }
                }
                const completeRow = document.getElementById('Completes'+i);
                if (completeRow !== null) {
                    const CompClass = completeRow.classList.contains('displayNone');                
                    if (CompClass === true) {
                        completeRow.classList.replace('displayNone', 'show');
                    }
                }
        } else if (radioButtWorking.checked) {
        // 完了したtodoを非表示にさせるclassを付与する
            const completeRow = document.getElementById('Completes'+i);   
                if (completeRow !== null) {
                    const CompClass = completeRow.classList.contains('show');                
                    if (CompClass === true) {
                        completeRow.classList.replace('show', 'displayNone');
                    }
                }
            // 作業中のtodoを表示させるclassを付与する
                const uncompleteRow = document.getElementById('unCompletes'+i);
                if (uncompleteRow !== null) {
                    const unCompClass = uncompleteRow.classList.contains('displayNone');                
                    if (unCompClass === true) {
                        uncompleteRow.classList.replace('displayNone', 'show');
                    }
                }

        } else if (radioButtDone.checked) {
            // 完了したtodoを非表示にさせるclassを付与する
            const uncompleteRow = document.getElementById('unCompletes'+i);   
                if (uncompleteRow !== null) {
                    const unCompClass = uncompleteRow.classList.contains('show');                
                    if (unCompClass === true) {
                        uncompleteRow.classList.replace('show', 'displayNone');
                    }
                }
            // 作業中のtodoを表示させるclassを付与する
                const completeRow = document.getElementById('Completes'+i);
                if (completeRow !== null) {
                    const CompClass = completeRow.classList.contains('displayNone');                
                    if (CompClass === true) {
                        completeRow.classList.replace('displayNone', 'show');
                    }
                }
        }
    }
};
   
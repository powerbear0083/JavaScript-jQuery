$(document).ready(function(e) {

	$('#add-todo').button({

		icons: {

			primary: 'ui-icon-circle-plus'

		}

	});

	// dialog 事件
	$('#new-todo').dialog({

		modal: true,
		autoOpen: false,
		buttons: { //新增按鈕

			'Add task': function(){

				var taskName = $('#task').val();

				if( taskName === '' ) { // 這個判斷式也可以用在其他地方

					return false; //這裡的 return false 只是離開fn，但是對話框還是維持開啟

				}

				var taskHTML = '<li><span class="done">%</span>';
					taskHTML += '<span class="delete">X</span>';
					taskHTML += '<span class="task"></span></li>';



				var $newTask = $(taskHTML); // 將 taskHTML 從文字轉換成 jQuery 物件

				//找到taskHTML 裡的 .task，再把 tankName 的值寫到 taskHTML 裡的 .task
				$newTask.find('.task').text(taskName);
				$newTask.hide();

				//把取到的值往前排
				$('#todo-list').prepend($newTask);

				$newTask.show('clip', 250).effect('highlight', 1000);
				$(this).dialog('close');

			},
			'Cancel': function(){

				$(this).dialog('close'); // 關閉這個對話框

			},
			close: function(){

				//清除 input 內容
				$('#new-todo input').val('');

			}

		}

	});

	//觸發 dialog 對話框
	$('#add-todo').button({

		icons: {

			primary: 'ui-icon-circle-plus'

		}

	}).on('click', function(){

		$('#new-todo').dialog('open');

	});

	//對 .done 進行事件委派設定
	$('#todo-list').on('click', '.done', function(){

		var $taskItem = $(this).parent('li');

		//點擊當前的li隱藏
		$taskItem.slideUp(250, function(){

			var $this = $(this);

				$this.detach(); //jQuery 的 detach，將網頁的Html 元素移除，但儲存在$this中

			$('#completed-list').prepend($this);  // '將當前點擊的$taskItem插入 completed-list 裡
			$this.slideDown();

		});

	});


	//建立可排序托拉功能
	$('.sortlist').sortable({

		connectWith: '.sortlist',
		cursor: 'pointer',
		placeholder: 'ui-state-highlight',
		cancel: '.delete, .done'

	});

	$('.sortlist').on('click', '.delete', function(){

		//選取你要刪除的清單項目
		$(this).parent('li').effect('puff', function(){

			$(this).remove();

		});

	});


}); // end ready
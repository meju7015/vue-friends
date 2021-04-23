import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // ture : 성능이슈,
	state: {
		todoList: [
			{
				title: '달리기',
				date: '2021-05-22 03:33:21',
				isEnd: false,
				id: 1
			}
		],
		toDayDate: new Date(),
		time: new Date(),
		todoChkNum: null
	},
	mutations: {
		addToDoItem(state, todoItem) {
			state.todoList.push(todoItem);
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},
		deleteToDoItem(state, todoItem) {
			state.todoList.forEach(function (item, index) {
				if (item.id === todoItem.id) {
					state.todoList.splice(index, 1);
				}
				//localStorage.removeItem(todoItem);
				let tmpData = JSON.stringify(state.todoList);
				localStorage.setItem('todoList', tmpData);
			})
		},
		clearToToList(state) {
			localStorage.clear();
			state.todoList = [];
		},
		completedToDo(state, todoItem) {
			state.todoList.forEach(item => {
				if (item.id === todoItem.id) {
					item.isEnd = !item.isEnd;
				}
			})
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},
		initTodoList(state) {
			if (localStorage.getItem('todoList')) {
				state.todoList = JSON.parse(localStorage.getItem('todoList'));
			}
		},
		sortTodoList(state) {
			state.todoList.sort(function (a, b) {
				return new Date(a.date) - new Date(b.date)
			})
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},
		reverseTodoList(state) {
			state.todoList.sort(function (a, b) {
				return new Date(b.date) - new Date(a.date)
			})
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		}
	},
	actions: {
		completedToDo({commit}, todoItem) { // {commit}
			commit('completedToDo', todoItem);
		},
		deleteToDoItem({commit}, todoItem) {
			commit('deleteToDoItem', todoItem);
		},
		addToDoItem({commit}, todoItem) {
			if (todoItem.title === '' || todoItem.title === null) {
				alert('할일을 입력해주세요');
			} else {
				todoItem.id = this.state.todoList[this.state.todoList.length - 1].id + 1;
				let today = new Date();
				todoItem.date = today.getFullYear() + '-' +
					(today.getMonth() + 1) + '-' +
					today.getDate() + ' ' +
					today.getHours() + ':' +
					today.getMinutes() + ':' +
					today.getSeconds();
				commit('addToDoItem', todoItem);
			}
		},
		initTodoList({commit}) {
			commit('initTodoList');
		},
		clearToToList({commit}) {
			commit('clearToToList');
		},
		sortTodoList({ commit }) {
			commit('sortTodoList');
		},
		reverseTodoList({ commit }) {
			commit('reverseTodoList');
		}
	},
	modules: {},
	getters: {
		toDayDate(state) {
			let today = state.toDayDate;
			today = today.getFullYear() + '-' +
				(today.getMonth() + 1) + '-' +
				today.getDate();

			return today;

		},
		time(state) {
			let time = state.time;
			time = time.getHours() + ':' +
				time.getMinutes() + ':' +
				time.getSeconds();

			return time;
		}
	},
	methods: {

	}
})
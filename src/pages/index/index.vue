<template>
  <view class="page">
    <wd-notice-bar :text="`待办 ${undoCount} 项 / 已完成 ${doneCount} 项`" />

    <wd-cell-group border>
      <wd-input v-model="newTodo" label="新建任务" label-width="80px" placeholder="输入任务内容" clearable :maxlength="50"
        show-word-limit @confirm="addTodo">
        <template #suffix>
          <wd-button type="primary" size="small" :disabled="!newTodo.trim()" @click="addTodo">
            添加
          </wd-button>
        </template>
      </wd-input>
    </wd-cell-group>

    <wd-cell-group v-if="todos.length > 0" border>
      <wd-swipe-action v-for="todo in todos" :key="todo.id">
        <template #right>
          <wd-button type="error" size="large" @click="removeTodo(todo.id)">删除</wd-button>
        </template>
        <wd-cell center>
          <template #title>
            <view class="todo-row">
              <wd-checkbox :model-value="todo.done" shape="square" @change="toggleTodo(todo.id)">
                <wd-text :text="todo.content" :custom-class="todo.done ? 'todo-done' : ''"
                  :decoration="todo.done ? 'line-through' : 'none'" :color="todo.done ? '#999' : '#333'" />
              </wd-checkbox>
            </view>
          </template>
        </wd-cell>
      </wd-swipe-action>
    </wd-cell-group>

    <wd-status-tip v-else type="empty" tip="暂无任务，快去添加一个吧！" />

    <wd-fab v-model:active="fabActive" position="right-bottom" @click="focusInput" />

    <wd-gap height="100px" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  content: string
  done: boolean
}

const todos = ref<Todo[]>([])
const newTodo = ref('')
const fabActive = ref(false)

const undoCount = computed(() => todos.value.filter(t => !t.done).length)

const doneCount = computed(() => todos.value.filter(t => t.done).length)

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.unshift({
      id: Date.now(),
      content: newTodo.value.trim(),
      done: false
    })
    newTodo.value = ''
  }
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(item => item.id !== id)
}

const focusInput = () => {
  fabActive.value = false
}
</script>

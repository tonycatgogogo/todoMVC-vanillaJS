export default class Template {
    //定义todo列表模板
    itemList(items) {
        return items.reduce((a, item) => a + `
<li data-id="${item.id}"${item.completed ? ' class="completed"' : ''}>
	<div class="view">
		<input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
		<label>${item.title}</label>
		<button class="destroy"></button>
	</div>
</li>`, '');
    }

    itemCounter(activeTodos) {
        return `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`
    }
}
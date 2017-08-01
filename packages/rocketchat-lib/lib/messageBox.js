RocketChat.messageBox = {};

RocketChat.messageBox.actions = new class {
	constructor() {
		this.actions = {};
	}

	/* Add a action to messagebox
	@param group
	@param action name
	@param config
	icon: icon class
	action: action function
	condition: condition to display the action
	*/

	add(group, actionName, config) {
		if (!group && !actionName && !config) {
			return;
		}

		if (!this.actions[group]) {
			this.actions[group] = [];
		}

		const actionExists = this.actions[group].find((action) => {
			return action.actionName === actionName;
		});

		if (actionExists) {
			return;
		}

		this.actions[group].push({...config, actionName});
	}

	get(group) {
		if (!group) {
			return Object.keys(this.actions).reduce((ret, key) => {
				const actions = this.actions[key].filter(action => !action.condition || action.condition());
				if (actions.length) {
					ret[key] = actions;
				}
				return ret;
			}, {});
		}

		return this.actions[group].filter(action => !action.condition || action.condition());
	}
};
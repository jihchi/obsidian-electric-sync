import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface ObsidianElectricSyncSettings {
	electricHost: string;
}

const DEFAULT_SETTINGS: ObsidianElectricSyncSettings = {
	electricHost: 'http://localhost:3000'
}

export default class ObsidianElectricSync extends Plugin {
	settings: ObsidianElectricSyncSettings;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Electric Sync is loaded');

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: ObsidianElectricSync;

	constructor(app: App, plugin: ObsidianElectricSync) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Electric host')
			.setDesc('The Electric host. For example: http://localhost:3000.')
			.addText(text => text
				.setPlaceholder('http://localhost:3000')
				.setValue(this.plugin.settings.electricHost)
				.onChange(async (value) => {
					this.plugin.settings.electricHost = value;
					await this.plugin.saveSettings();
				}));
	}
}

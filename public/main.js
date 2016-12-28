(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const mainView = window.mainView;
	const loginView = window.loginView;
	const registView = window.registView;
	const menuView = window.menuView;
	const searchGameView = window.searchGameView;
	const ratingView = window.ratingView;
	const configView = window.configView;
	const profileView = window.profileView;
	const gameView = window.gameView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
		.addRoute('/chat', ChatView)
		.addRoute('/login',loginView)
		.addRoute('/registration',registView)
		.addRoute('/menu',menuView)
		.addRoute('/searchGame',searchGameView)
		.addRoute('/rating',ratingView)
		.addRoute('/profile',profileView)
		.addRoute('/config',configView)
		.addRoute('/game',gameView)
		.addRoute('/menu',menuView)


		.addRoute('/', mainView)

		.start();
})();

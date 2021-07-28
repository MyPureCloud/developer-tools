import config from '../config/environment';

class Account {
	constructor(token, env) {
		this.token = token;
		this.environment = env;
		this.profilePicUri = '';
		this.userId = '';
		this.me = '';
		this.profilePicUri = '';
		this.status = ''; //boolean of status of account(active/nota active)
		this.confirmChanges = '';
	}

	getData() {
		return { token: this.token, env: this.environment, userId: this.userId };
	}

	initialize() {
		let that = this;
		return new Promise(function (myResolve, myReject) {
			$.ajax({
				type: 'GET',
				url: `https://api.${encodeURIComponent(that.environment)}/api/v2/users/me?expand=organization`,
				dataType: 'json',
				headers: {
					Authorization: 'bearer ' + that.token,
				},
			})
				.then((data) => {
					if (data) {
						that.status = false;
						that.confirmChanges = false;
						that.me = data;
						that.userId = data.id;
						that.profilePicUri =
							data === null || !data.images
								? `${config.APP.urlprefix.replace(/\/?$/, '/')}assets/images/profile-default.svg`
								: data.images[0].imageUri;
						myResolve();
					}
				})
				.catch(function (error) {
					myReject(error);
				});
		});
	}
}

export default Account;

let app = new Vue({
	el: '#idForm',
	data: {
		form: form,
		flagURl: false,
		loading: false
	},
	methods: {
		checkCriteria(question) {
			const answers = this.answers;
			if (question.hasOwnProperty('if')) {
				for (const ans in question.if) {
					const checkQuestion = this.form.find((q) => q.name == ans);
					if (checkQuestion.type == 'boolean' && checkQuestion.answer != question.if[ans]) {
						return false;
					}
				}
			}
			return true;
		},
		getRequest(path) {
			if (path == 0) {
				const idQ = this.form.find((q) => q.name == 'typeID').choices.reduce((acc, cur) => {
					acc[cur.name] = cur.answer;
					return acc;
				}, {});
				const state = this.form.find((q) => q.name == 'docsState1');
				console.log(state);
				console.log('test');

				if (!idQ.stateID) {
					return `/get_url/state_id/?state=${state.answer}`;
				} else if (!idQ.passport) {
					return `/get_url/us_passport/FE`;
				}
			} else if (path == 1) {
				const state = this.form.find((q) => q.name == 'docsState');
				return `/get_url/state_id/${state.answer}`;
			} else if (path == 2) {
				if (this.form.find((q) => q.name == 'docsCountry2').answer) {
					var country = this.form.find((q) => q.name == 'docsCountry2').answer;
				} else if (this.form.find((q) => q.name == 'bornCountry').answer) {
					var country = this.form.find((q) => q.name == 'bornCountry').answer;
				}
				country = country.toLowerCase().replace(/ /g, '-');
				// return `/get_embassy/${country}`;
				return `get_embassy/${country}`;
			} else if (path == 3) {
				const state = this.form.find((q) => q.name == 'bornState');
				return `/get_url/vital_records/?state=${state.answer}`;
			} else if (path == 4) {
				let country = this.form.find((q) => q.name == 'bornCountry').answer;
				country = country.toLowerCase().replace(/ /g, '-');
				// return `/get_embassy/${country}`;
				return `get_embassy/${country}`;
			} else if (path == 5) {
				return `https://www.ssa.gov/myaccount/replacement-card.html`;
			}
		},
		doRequest(path) {
			const a = this.getRequest(path);
			console.log('a', a);
			this.loading = true;

			if (a.includes('ssa.gov')) {
				this.loading = false;
				document.getElementById('url').href = a;
				document.getElementById('url').innerHTML = a;
				document.getElementById('url').hidden = false;
				document.getElementById('copyButton').hidden = false;
			}

			if (a.includes('get_embassy')) {
				this.loading = false;
				var country = a.split('/');
				document.getElementById('url').href = 'https://embassy.goabroad.com/embassies-of/' + country[1];
				document.getElementById('url').innerHTML = 'https://embassy.goabroad.com/embassies-of/' + country[1];
				document.getElementById('url').hidden = false;
				document.getElementById('copyButton').hidden = false;
			} else {
				var url = `https://first-id-backend.herokuapp.com${a}`;
				axios
					.get(url, {
						headers: {
							'Access-Control-Allow-Origin': '*'
						}
					})
					.then((res) => {
						console.log('res', res.data);
						this.loading = false;
						document.getElementById('url').href = res.data;
						document.getElementById('url').innerHTML = res.data;
						document.getElementById('url').hidden = false;
						document.getElementById('copyButton').hidden = false;
					});
			}
		}
	}
});
function hideURL() {
	document.getElementById('url').hidden = true;
	document.getElementById('copyButton').hidden = true;
}

document.getElementById('copyButton').addEventListener('click', function() {
	copyToClipboard(document.getElementById('url'));
});

function copyToClipboard(elem) {
	// create hidden text element, if it doesn't already exist
	var targetId = '_hiddenCopyText_';
	var isInput = elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA';
	var origSelectionStart, origSelectionEnd;
	if (isInput) {
		// can just use the original source element for the selection and copy
		target = elem;
		origSelectionStart = elem.selectionStart;
		origSelectionEnd = elem.selectionEnd;
	} else {
		// must use a temporary form element for the selection and copy
		target = document.getElementById(targetId);
		if (!target) {
			var target = document.createElement('textarea');
			target.style.position = 'absolute';
			target.style.left = '-9999px';
			target.style.top = '0';
			target.id = targetId;
			document.body.appendChild(target);
		}
		target.textContent = elem.textContent;
	}
	// select the content
	var currentFocus = document.activeElement;

	target.focus();
	target.setSelectionRange(0, target.value.length);

	// copy the selection
	var succeed;
	try {
		succeed = document.execCommand('copy');
	} catch (e) {
		succeed = false;
	}
	// restore original focus
	if (currentFocus && typeof currentFocus.focus === 'function') {
		currentFocus.focus();
	}

	if (isInput) {
		// restore prior selection
		elem.setSelectionRange(origSelectionStart, origSelectionEnd);
	} else {
		// clear temporary content
		target.textContent = '';
	}

	return succeed;
}

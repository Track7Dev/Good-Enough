
export const convertTimeStamp = function(timestamp) {
	var monthObj = {
		'Jan': "January",
		'Feb': "February",
		'Mar': "March",
		'Apr': "April",
		'May': "May",
		'Jun': "June",
		'Jul': "July",
		'Aug': "August",
		'Sep': "September",
		'Oct': "October",
		'Nov': "November",
		'Dec': "December"
	};
	var dayObj = {
		'01': 'st',
		'02': 'nd',
		'03': 'rd',
		'21': 'st',
		'22': 'nd',
		'23': 'rd',
		'31': 'st'
	};
	var year = timestamp.substring(11, 15);
	var month = monthObj[timestamp.substring(4, 7)];
	var day = timestamp.substring(8, 10);
	var hour = timestamp.substring(16, 18);
	var minute = timestamp.substring(19, 21);
	var zone;
	if(dayObj[day]) {
		var end = dayObj[day]
		if(day < 10) day = day.slice(1)
		day = day + end;
	} else {
		if(day < 10) day = day.slice(1)
		day = day + 'th';
	}
	if (hour > 11 && hour !== 24) {
		hour -= 12
		zone = ' PM'
	} else {
		zone = ' AM'
	}
	var result = hour + ':' + minute + zone + ' - ' + month + ' ' + day + ', ' + year
	return result;
}

export const addAuthToken = function(token) {
	// Set token data into local storage
	window.localStorage.setItem('GoodEnough', token)
}

export const deleteAuthToken = function() {
	// Remove local storage ID and Token
  	window.localStorage.removeItem('GoodEnough');
}

export const status = function(response) {
  if (response.status === 403) {
  	deleteAuthToken()
  	console.log('unauthorized token...logging out')
  	return
  }
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}


export const json = function(response) { return response.json() }


// Only works on profile page
export const getUserInfo = function(props) {
  var userData = window.localStorage.getItem('GoodEnough')
  fetch('/app/users/info', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: userData
        })
    .then(status)
    .then(json)
    .then(function(data) {
      props.actions.profile(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

export const validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



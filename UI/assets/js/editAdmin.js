/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = 'http://localhost:8080';


const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  window.location.href = './signin.html';
};

fetch(`${basePath}/api/v1/users`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`
  }
}).then((res) => {
  if (res.status !== 200) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    console.log('Hey');
    if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

fetch(`${basePath}/api/v1/offices`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`
  }
}).then((res) => {
  if (res.status === 404) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 404) {
      document.getElementById('no-data').innerHTML = 'No party has been created'
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      data.forEach((off) => {
        document.getElementById('offices').innerHTML += `<tr><td>${count++}</td>
        <td>${off.type}</td>
        <td>${off.name}</td>`
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));


fetch(`${basePath}/api/v1/parties`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()} `
  }
}).then((res) => {
  if (res.status === 404) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 404) {
      document.getElementById('no-data').innerHTML = 'No party has been created'
    }
    console.log(response);
    if (response.status === 200) {
      let count = 1;
      response.data.forEach((part) => {
        document.getElementById('parties').innerHTML += `<tr> <td>${count++}</td>
          <td><img src="${part.logourl}" id="logo_image"></td>
            <td>${part.name}</td>
            <td>${part.hqaddress}</td>
            <td><a href="#" onclick="editFile(${part.party_id})" id="editLo" class="edit">Edit</a></td>
            <td><a href="#" class="delete" onclick="deleteFile(${part.party_id})" id="del">Delete</a></td></tr>`
      })
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const editFile = (id) => {
  window.location.href = `../ editparties.html ? party_id = ${id} `;
};

const deleteFile = (id) => {
  fetch(`${basePath}/api/v1/parties/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getToken()} `
    }
  }).then((res) => {
    if (res.status === 404) {
      return res;
    }
    return res.json();
  })
    .then((response) => {
      if (response.status === 404) {
        console.log(404);
      }
      if (response.status === 200) {
        window.location.href = './list_all.html'
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};

fetch(`${basePath}/api/v1/candidates`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()} `
  }
}).then((res) => {
  if (res.status === 404) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 404) {
      document.getElementById('no-data3').innerHTML = 'No candidate has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      console.log(data);
      data.forEach((cand) => {
        document.getElementById('candidate').innerHTML += `<tr><td>${count++}</td>
          <td>${cand.firstname} ${cand.lastname}</td>
          <td>${cand.name}</td>
          <td>${cand.party}</td>
          <td><a href="#" id="editLo" onclick="acceptIt(${cand.candidate_id})" class="edit">Accept</a></td>`;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const acceptIt = (id) => {
  console.log(id);
  fetch(`${basePath}/api/v1/office/${id}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getToken()}`
    }
  }).then((res) => {
    if (res.status !== 200) {
      return res;
    }
    return res.json();
  })
    .then((response) => {
      if (response.status === 404) {
        document.getElementById('no-data3').innerHTML = 'No party has been created';
      }
      if (response.status === 201) {
        window.location.href = './list_all.html';
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};

fetch(`${basePath}/api/v1/petitions/all`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()} `
  }
}).then((res) => {
  if (res.status === 404) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 404) {
      // document.getElementById('no-data3').innerHTML = 'No pe has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      data.forEach((petitions) => {
        document.getElementById('petitions').innerHTML += `<tr><td>${count++}</td>
          <td>${petitions.firstname} ${petitions.lastname}</td>
          <td>${petitions.name}, ${petitions.type}</td>
          <td>${petitions.body}</td>
          <td><img src="${petitions.evidence}" id="logo_image"></td>
          </tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import Header from './Header'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Pagination from 'react-js-pagination'
import 'react-notifications/lib/notifications.css'


function Users() {
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  
  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [perPage] = useState(5)
  const [activePage, setActivePage] = useState(1)


  let setData = offset => {
    axios.get(`/api/user/?limit=${perPage}&offset=${offset}`).then(res => {
      setUsers(res.data.results)
      setTotalCount(res.data.count)

      res.data.results.forEach((u, index) => {
        $(`.edit-user-${index} #input-username-${index}`).val(u.username)
        $(`.edit-user-${index} #input-group-${index}`).val(u.group.name)
      })
    })

    axios.get('/api/group/').then(res => {
      setGroups(res.data)
    })
  }

  useEffect(setData, [])


  let formatDataTime = dataTime => {
    return `${dataTime.split('T')[0]} ${dataTime.split('T')[1].split('.')[0]}`
  }

  let editUser = (index, userId) => {
    let username = $(`.edit-user-${index} #input-username-${index}`).val()
    let groupValue = $(`.edit-user-${index} #input-group-${index}`).val()
    let groupDataListOption = $(`#groups [value="${groupValue}"]`)

    if (username && groupDataListOption) {
      let group = groupDataListOption.data('value')

      axios.put(`/api/user/${userId}/`, {username, group}).then(res => {
        $(`#edit-modal-${index}`).trigger('click')
        setData(offset)
        NotificationManager.success('Success')
      }).catch(() => {
        NotificationManager.error('Error')
      })
    }
  }

  let addUser = () => {
    let username = $('.add-user #input-username').val()
    let groupValue = $('.add-user #input-group').val()
    let groupDataListOption = $(`#groups [value="${groupValue}"]`)

    if (username && groupDataListOption) {
      let group = groupDataListOption.data('value')

      if (group) {
        axios.post('/api/user/', {username, group}).then(res => {
          console.log(res)
          $('#add-user-modal').trigger('click')
          setData(offset)
          NotificationManager.success('Success')

          $('.add-user #input-username').val('')
          $('.add-user #input-group').val('')
        }).catch(() => {
          NotificationManager.error('Error')
        })
      }
    }
  }

  let deleteUser = (index, userId) => {
    axios.delete(`/api/user/${userId}/`).then(res => {
      console.log(res)
      $(`#delete-modal-${index}`).trigger('click')
      setData(offset)
      NotificationManager.success('Success')
    }).catch(() => {
      NotificationManager.error('Error')
    })
  }

  let handlePageChange = pageNumber => {
    let _offset = Math.ceil((pageNumber - 1) * perPage)

    setOffset(_offset)
    setData(_offset)
    setActivePage(pageNumber)
  }

  return (
    <div>
      <NotificationContainer/>

      <Header />
      <button type="button" className="btn btn-dark add" data-bs-toggle="modal" data-bs-target="#add-user-modal">Add User</button>
      <div className="modal fade" id="add-user-modal" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add user</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className={`mb-3 add-user`}>
                <label for="input-username" className="form-label">Username</label>
                <input type="text" className="form-control" id="input-username" />
                <br />
                <label for="input-group" className="form-label">Group</label>
                <input list="groups" className="form-control" id="input-group" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-dark" onClick={addUser}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="table-container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Created</th>
              <th scope="col">Group</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr>
                <th scope="row">{u.id}</th>
                <td>{u.username}</td>
                <td>{formatDataTime(u.created)}</td>
                <td>{u.group.name}</td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button" className="btn btn-dark"
                      data-bs-toggle="modal"
                      data-bs-target={`#edit-modal-${index}`}
                    >Edit</button>
                    <button
                      type="button" className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#delete-modal-${index}`}
                    >Delete</button>
                  </div>
                </td>

                <div className="modal fade" id={`edit-modal-${index}`} tabindex="-1" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Edit user with id {u.id}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <div className="modal-body">
                        <div className={`mb-3 edit-user-${index}`}>
                          <label for={`input-username-${index}`} className="form-label">Username</label>
                          <input type="text" className="form-control" id={`input-username-${index}`} />
                          <br />
                          <label for={`input-group-${index}`} className="form-label">Group</label>
                          <input list="groups" className="form-control" id={`input-group-${index}`} />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-dark" onClick={() => editUser(index, u.id)}>Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id={`delete-modal-${index}`} tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete user {u.username}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <p>Are you sure?</p>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-dark" onClick={() => deleteUser(index, u.id)}>Yes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <datalist id="groups">
        {groups.map(g => (
          <option value={g.name} data-value={g.id}></option>
        ))}
      </datalist>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={perPage}
        totalItemsCount={totalCount}
        onChange={handlePageChange}
        innerClass="pagination"
      />
    </div>
  )
}

export default Users
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import Header from './Header'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Pagination from 'react-js-pagination'
import 'react-notifications/lib/notifications.css'


function Groups() {
  const [groups, setGroups] = useState([])

  const [totalCount, setTotalCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [perPage] = useState(5)
  const [activePage, setActivePage] = useState(1)


  let setData = offset => {
    axios.get(`/api/group/?limit=${perPage}&offset=${offset}`).then(res => {
      setGroups(res.data.results)
      setTotalCount(res.data.count)

      res.data.results.forEach((g, index) => {
        $(`.edit-group-${index} #input-name-${index}`).val(g.name)
        $(`.edit-group-${index} #input-desc-${index}`).val(g.description)
      })
    })
  }

  useEffect(setData, [])

  let editGroup = (index, groupId) => {
    let name = $(`.edit-group-${index} #input-name-${index}`).val()
    let description = $(`.edit-group-${index} #input-desc-${index}`).val()

    if (name && description) {
      axios.put(`/api/group/${groupId}/`, {name, description}).then(() => {
        $(`#edit-modal-${index}`).trigger('click')
        setData(offset)
        NotificationManager.success('Success')
      }).catch(() => {
        NotificationManager.error('Error')
      })
    }
  }

  let addGroup = () => {    
    let name = $('.add-group #input-name').val()
    let description = $('.add-group #input-desc').val()

    if (name && description) {
      axios.post('/api/group/', {name, description}).then(() => {
        $('#add-group-modal').trigger('click')
        setData(offset)
        NotificationManager.success('Success')

        $('.add-group #input-name').val('')
        $('.add-group #input-desc').val('')
      }).catch(() => {
        NotificationManager.error('Error')
      })
    }
  }

  let deleteGroup = (index, groupId) => {
    axios.delete(`/api/group/${groupId}/`).then(() => {
      $(`#delete-modal-${index}`).trigger('click')
      setData(offset)
      NotificationManager.success('Success')
    }).catch(() => {
      NotificationManager.error('Error, maybe the user is assigned to this group')
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
      <button type="button" className="btn btn-dark add" data-bs-toggle="modal" data-bs-target="#add-group-modal">Add Group</button>
      <div className="modal fade" id="add-group-modal" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add group</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className={`mb-3 add-group`}>
                <label for="input-name" className="form-label">Name</label>
                <input type="text" className="form-control" id="input-name" />
                <br />
                <label for="input-desc" className="form-label">Description</label>
                <input list="groups" className="form-control" id="input-desc" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-dark" onClick={addGroup}>Add</button>
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
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g, index) => (
              <tr>
                <th scope="row">{g.id}</th>
                <td>{g.name}</td>
                <td>{g.description}</td>
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
                        <h5 className="modal-title">Edit group with id {g.id}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <div className="modal-body">
                        <div className={`mb-3 edit-group-${index}`}>
                          <label for={`input-name-${index}`} className="form-label">Name</label>
                          <input type="text" className="form-control" id={`input-name-${index}`} />
                          <br />
                          <label for={`input-desc-${index}`} className="form-label">Description</label>
                          <input list="groups" className="form-control" id={`input-desc-${index}`} />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-dark" onClick={() => editGroup(index, g.id)}>Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id={`delete-modal-${index}`} tabindex="-1" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Delete group {g.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <div className="modal-body">
                        <p>Are you sure?</p>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-dark" onClick={() => deleteGroup(index, g.id)}>Yes</button>
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

export default Groups
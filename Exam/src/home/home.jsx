import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Api = "https://to-dos-api.softclub.tj/api/to-dos"
const imagese = "https://to-dos-api.softclub.tj/images/"

export default function Home() {
  const router = useNavigate()
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState(null)
  const [addmodal, setAddmodal] = useState(false)
  const [editmodal, setEditmodal] = useState(false)
  const [editname, setEditname] = useState("")
  const [editdesc, setEditdesc] = useState("")
  const [editid, setEditid] = useState(null)
  const [imgid, setImgid] = useState(null)
  const [addimgmodal, setAddimgmodal] = useState(false)
  const [isDark, setIsDark] = useState(false)

  async function getusers() {
    try {
      const { data } = await axios.get(Api)
      console.log(data.data)
      setData(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getusers()
  }, [])

  async function deletuser(id) {
    try {
      await axios.delete(`${Api}?id=${id}`)
      getusers()
    } catch (error) {
      console.error(error)
    }
  }

  async function adduser() {
    try {
      const formdata = new FormData()
      formdata.append("Name", name)
      formdata.append("Description", desc)
      if (image) formdata.append("Images", image)
      await axios.post(Api, formdata, {
        headers: {
          "Content-Type": " multipart/form-data",
        },
      })
      getusers()
      setName("")
      setDesc("")
      setImage(null)
      setAddmodal(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function deletimg(id) {
    try {
      await axios.delete(`${Api}/images/${id}`)
      getusers()
    } catch (error) {
      console.error(error)
    }
  }

  const openeditmodal = (elem) => {
    setEditname(elem.name)
    setEditdesc(elem.description)
    setEditid(elem.id)
    setEditmodal(true)
  }

  async function edituser() {
    const editing = {
      name: editname,
      description: editdesc,
      id: editid,
    }
    try {
      await axios.put(Api, editing)
      getusers()
      setEditmodal(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function chexbox(params) {
    params.isCompleted = !params.isCompleted
    try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${params.id}`, params)
      getusers()
    } catch (error) {
      console.error(error)
    }
  }

  function imgmodal(elem) {
    setAddimgmodal(true)
    setImgid(elem.id)
  }

  async function addimg(e) {
    e.preventDefault()
    const res = e.target.addimg.files
    const formdata = new FormData()
    for (let i = 0; i < res.length; i++) {
      formdata.append("Images", res[i])
    }
    try {
      await axios.post(`${Api}/${imgid}/images`, formdata)
      getusers()
      setAddimgmodal(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-foreground">User List</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAddmodal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  NEW
                </button>
                <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setIsDark(false)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${!isDark ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    LIGHT
                  </button>
                  <button
                    onClick={() => setIsDark(true)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isDark ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    DARK
                    <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 max-w-xs">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status</label>
              <select className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>All status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex-1 max-w-xs">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">City</label>
              <select className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>All cities</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name, email, etc..."
                  className="w-full px-3 py-2 pr-10 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Name
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Description
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      </svg>
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((elem) => (
                  <tr key={elem.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-10 h-10 rounded-full  from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {elem.name?.charAt(0)?.toUpperCase() || "U"}
                        </div> */}
                        <div className="font-medium text-foreground">{elem.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{elem.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${elem.isCompleted ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"}`}
                        >
                          {elem.isCompleted ? "ACTIVE" : "INACTIVE"}
                        </span>
                        <input
                          type="checkbox"
                          checked={elem.isCompleted}
                          onChange={() => chexbox(elem)}
                          className="w-4 h-4 rounded border-border text-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {elem.images?.map((el) => (
                          <div key={el.id} className="relative group">
                            <img
                              src={`${imagese}/${el.imageName}`}
                              alt="user"
                              className="w-12 h-12 rounded-lg object-cover border border-border"
                            />
                            <button
                              onClick={() => deletimg(el.id)}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => imgmodal(elem)}
                          className="w-12 h-12 rounded-lg border-2 border-dashed border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 flex items-center justify-center transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router(`/home/${elem.id}`)}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30 rounded-md transition-colors"
                        >
                          Info
                        </button>
                        <button
                          onClick={() => openeditmodal(elem)}
                          className="px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletuser(elem.id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {addmodal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Add New User</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(el) => setName(el.target.value)}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                  <input
                    type="text"
                    value={desc}
                    onChange={(el) => setDesc(el.target.value)}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Image</label>
                  <input
                    type="file"
                    onChange={(el) => setImage(el.target.files[0])}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-400"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  onClick={() => setAddmodal(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={adduser}
                  className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editmodal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Edit User</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input
                    type="text"
                    value={editname}
                    onChange={(el) => setEditname(el.target.value)}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                  <input
                    type="text"
                    value={editdesc}
                    onChange={(el) => setEditdesc(el.target.value)}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  onClick={() => setEditmodal(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={edituser}
                  className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Image Modal */}
        {addimgmodal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Add Images</h2>
              </div>
              <form onSubmit={addimg}>
                <div className="px-6 py-4">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Select Images</label>
                  <input
                    type="file"
                    name="addimg"
                    multiple
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-400"
                  />
                </div>
                <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setAddimgmodal(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Upload Images
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

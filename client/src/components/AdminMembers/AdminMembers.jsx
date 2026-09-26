import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
} from "lucide-react";

import "./AdminMembers.css";


/* =========================================
   API URL
========================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


/* =========================================
   COMPONENT
========================================= */

function AdminMembers() {
  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingMember, setEditingMember] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      plan: "Monthly",
      status: "Active",
    });


  /* =========================================
     GET MEMBERS
  ========================================= */

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");


      const response = await fetch(
        `${API_BASE_URL}/api/members`
      );


      const contentType =
        response.headers.get(
          "content-type"
        ) || "";


      if (
        !contentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The S3 backend did not return JSON. Please check your API URL."
        );
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch members."
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch members."
        );
      }


      setMembers(
        Array.isArray(data.members)
          ? data.members
          : []
      );

    } catch (error) {
      console.error(
        "Fetch members error:",
        error
      );

      setError(
        error.message ||
          "Unable to load members."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    fetchMembers();
  }, []);


  /* =========================================
     FORM INPUT
  ========================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;


    setFormData(
      (currentData) => ({
        ...currentData,
        [name]: value,
      })
    );
  };


  /* =========================================
     OPEN ADD MODAL
  ========================================= */

  const handleAddMember = () => {
    setEditingMember(null);


    setFormData({
      name: "",
      email: "",
      phone: "",
      plan: "Monthly",
      status: "Active",
    });


    setError("");
    setShowModal(true);
  };


  /* =========================================
     OPEN EDIT MODAL
  ========================================= */

  const handleEditMember = (
    member
  ) => {
    setEditingMember(member);


    setFormData({
      name: member.name || "",
      email: member.email || "",
      phone: member.phone || "",
      plan: member.plan || "Monthly",
      status:
        member.status || "Active",
    });


    setError("");
    setShowModal(true);
  };


  /* =========================================
     CLOSE MODAL
  ========================================= */

  const closeModal = () => {
    setShowModal(false);

    setEditingMember(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      plan: "Monthly",
      status: "Active",
    });
  };


  /* =========================================
     ADD / UPDATE MEMBER
  ========================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();


    try {
      setError("");


      const isEditing =
        Boolean(editingMember);


      const url = isEditing
        ? `${API_BASE_URL}/api/members/${editingMember.id}`
        : `${API_BASE_URL}/api/members`;


      const method = isEditing
        ? "PUT"
        : "POST";


      const response =
        await fetch(url, {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        });


      const contentType =
        response.headers.get(
          "content-type"
        ) || "";


      if (
        !contentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The S3 backend did not return JSON. Please check your API URL."
        );
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save member."
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to save member."
        );
      }


      closeModal();

      await fetchMembers();

    } catch (error) {
      console.error(
        "Save member error:",
        error
      );


      setError(
        error.message ||
          "Failed to save member."
      );
    }
  };


  /* =========================================
     DELETE MEMBER
  ========================================= */

  const handleDeleteMember = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this member?"
      );


    if (!confirmed) {
      return;
    }


    try {
      setError("");


      const response =
        await fetch(
          `${API_BASE_URL}/api/members/${id}`,
          {
            method: "DELETE",
          }
        );


      const contentType =
        response.headers.get(
          "content-type"
        ) || "";


      if (
        !contentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The S3 backend did not return JSON. Please check your API URL."
        );
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete member."
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to delete member."
        );
      }


      await fetchMembers();

    } catch (error) {
      console.error(
        "Delete member error:",
        error
      );


      setError(
        error.message ||
          "Failed to delete member."
      );
    }
  };


  /* =========================================
     SEARCH
  ========================================= */

  const filteredMembers =
    members.filter(
      (member) => {
        const search =
          searchTerm
            .toLowerCase()
            .trim();


        if (!search) {
          return true;
        }


        return (
          member.name
            ?.toLowerCase()
            .includes(search) ||
          member.email
            ?.toLowerCase()
            .includes(search) ||
          member.phone
            ?.toLowerCase()
            .includes(search) ||
          member.plan
            ?.toLowerCase()
            .includes(search) ||
          member.status
            ?.toLowerCase()
            .includes(search)
        );
      }
    );


  /* =========================================
     PAGE
  ========================================= */

  return (
    <section className="admin-members">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="admin-members-header">

        <div>

          <h1>
            Members
          </h1>

          <p>
            Manage S3 coworking café
            members.
          </p>

        </div>


        <button
          type="button"
          className="admin-members-add-button"
          onClick={
            handleAddMember
          }
        >
          <Plus size={18} />

          Add Member
        </button>

      </div>


      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="admin-members-toolbar">

        <div className="admin-members-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="admin-members-error">
          {error}
        </div>
      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <div className="admin-members-message">
          Loading members...
        </div>

      ) : (

        <>

          {/* ===================================
              TABLE
          =================================== */}

          <div className="admin-members-table-wrapper">

            <table className="admin-members-table">

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Member
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Plan
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Joined
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredMembers.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="admin-members-empty"
                    >
                      No members found.
                    </td>

                  </tr>

                ) : (

                  filteredMembers.map(
                    (member) => (

                      <tr
                        key={
                          member.id
                        }
                      >

                        {/* ID */}

                        <td>
                          #{member.id}
                        </td>


                        {/* MEMBER */}

                        <td>

                          <div className="member-info">

                            <strong>
                              {
                                member.name
                              }
                            </strong>

                            <span>
                              {
                                member.email
                              }
                            </span>

                          </div>

                        </td>


                        {/* PHONE */}

                        <td>
                          {
                            member.phone
                          }
                        </td>


                        {/* PLAN */}

                        <td>

                          <span className="member-plan">
                            {
                              member.plan
                            }
                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`member-status ${
                              member.status
                                ?.toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )
                            }`}
                          >
                            {
                              member.status
                            }
                          </span>

                        </td>


                        {/* JOINED */}

                        <td>

                          {member.joined_at
                            ? new Date(
                                member.joined_at
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="member-actions">

                            {/* EDIT */}

                            <button
                              type="button"
                              className="member-edit-button"
                              onClick={() =>
                                handleEditMember(
                                  member
                                )
                              }
                              title="Edit member"
                            >
                              <Edit
                                size={16}
                              />
                            </button>


                            {/* DELETE */}

                            <button
                              type="button"
                              className="member-delete-button"
                              onClick={() =>
                                handleDeleteMember(
                                  member.id
                                )
                              }
                              title="Delete member"
                            >
                              <Trash2
                                size={16}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>


          {/* ===================================
              MEMBER COUNT
          =================================== */}

          <div className="admin-members-count">

            Showing{" "}

            <strong>
              {
                filteredMembers.length
              }
            </strong>

            {" "}of{" "}

            <strong>
              {members.length}
            </strong>

            {" "}members

          </div>

        </>

      )}


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showModal && (

        <div
          className="admin-member-modal-overlay"
          onClick={
            closeModal
          }
        >

          <div
            className="admin-member-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="admin-member-modal-header">

              <div>

                <h2>
                  {editingMember
                    ? "Edit Member"
                    : "Add Member"}
                </h2>

                <p>
                  {editingMember
                    ? "Update member details."
                    : "Add a new S3 member."}
                </p>

              </div>


              <button
                type="button"
                className="admin-member-modal-close"
                onClick={
                  closeModal
                }
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form
              className="admin-member-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* NAME */}

              <div className="admin-member-form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter full name"
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="admin-member-form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter email"
                  required
                />

              </div>


              {/* PHONE */}

              <div className="admin-member-form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter phone number"
                  required
                />

              </div>


              {/* PLAN + STATUS */}

              <div className="admin-member-form-row">

                <div className="admin-member-form-group">

                  <label>
                    Plan
                  </label>

                  <select
                    name="plan"
                    value={
                      formData.plan
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Daily">
                      Daily
                    </option>

                    <option value="Weekly">
                      Weekly
                    </option>

                    <option value="Monthly">
                      Monthly
                    </option>

                    <option value="Quarterly">
                      Quarterly
                    </option>

                    <option value="Yearly">
                      Yearly
                    </option>

                  </select>

                </div>


                <div className="admin-member-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>


              {/* FORM ACTIONS */}

              <div className="admin-member-form-actions">

                <button
                  type="button"
                  className="admin-member-cancel-button"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="admin-member-save-button"
                >
                  {editingMember
                    ? "Update Member"
                    : "Add Member"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}


export default AdminMembers;
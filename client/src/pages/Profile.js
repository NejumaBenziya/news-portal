function Profile() {

  // Get admin details from localStorage
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  return (

    // Main container
    <div className="container mt-5">

      {/* Profile Card */}
      <div className="card shadow p-4">

        {/* Page Title */}
        <h2 className="mb-4">
          My Profile
        </h2>

        {/* Admin Name */}
        <p>
          <strong>Name:</strong>
          {" "}
          {admin?.name}
        </p>

        {/* Admin Email */}
        <p>
          <strong>Email:</strong>
          {" "}
          {admin?.email}
        </p>

        {/* Admin Role */}
        <p>
          <strong>Role:</strong>
          {" "}
          Admin
        </p>

      </div>

    </div>
  );
}

export default Profile;
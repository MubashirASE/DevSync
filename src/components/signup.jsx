


const SignUp=()=>{

    return(
<div
          style={{
            border: "0.5px ",
            borderRadius: "7px",
            width: "350px",
            height: "410px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#EFEFEF",

            paddingInline: "12px",
          }}
        >
          <h2
            style={{
              color: "red",
            }}
          >
            Sign In:
          </h2>
          <label>Email:</label>
          <input
            type="email"
            placeholder="email"
            style={{
              padding: "8px",
              marginBlock: "8px",
              border: "0.5px ",
              borderRadius: "5px",
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="password"
            style={{
              padding: "8px",
              marginBlock: "8px",
              border: "0.5px ",
              borderRadius: "5px",
            }}
          />

          <button
            style={{
              padding: "8px",
              border: "0.5px ",
              background: "red",
              color: "white",
              marginBlock: "8px",
              borderRadius: "5px",
            }}
          >
            Sign In
          </button>
        </div>
    )
}

export default SignUp

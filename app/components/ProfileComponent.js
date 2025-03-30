import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setTeamName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [hasTeam, setHasTeam] = useState(false);
  const [userTeams, setUserTeams] = useState([]);
  const [isTeamOwner, setIsTeamOwner] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [userEmail, setUserEmail] = useState(""); 

  const getUserDetails = async () => {
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!userId) {
      console.error("User ID not found in localStorage");
      return null;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/get-details?id=${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      const { username, email, subscription } = data.user;
      setUserEmail(email); 
      return { username, email, subscription };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const getUserTeams = async () => {
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!userId) {
      console.error("User ID not found in localStorage");
      return null;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/get-user-team/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user teams");
      }

      const data = await response.json();

      if (data.success) {
        setUserTeams(data.teams);
        if (data.teams.length > 0) {
          setCurrentTeam(data.teams[0]);
          setHasTeam(true);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user teams:", error);
      // toast.error("Failed to fetch user teams");
    }
  };

  const createTeam = async () => {
    if (hasTeam) {
      toast.error("You can only create one team");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();
      if (data.success) {
        const newTeam = data.team;
        setCurrentTeam(newTeam);
        setHasTeam(true);
        setIsTeamOwner(true);
        
        setTeamMembers([{
          email: userEmail, 
          status: 'accepted',
          _id: newTeam.owner._id
        }]);
        
        setTeamName("");
        toast.success("Team created successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team");
    }
  };

  const fetchTeamMembers = async (teamId) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/${teamId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      if (data.success) {
        const acceptedMembers = data.team.members.map(member => ({
          ...member,
          status: 'accepted'
        }));
  
        const pendingInvites = data.team.invitations
          .filter(invite => invite.status === 'pending')
          .map(invite => ({
            email: invite.email,
            status: 'pending',
            _id: invite._id
          }));
  
        setTeamMembers([...acceptedMembers, ...pendingInvites]);
        setIsTeamOwner(data.team.owner._id === userId);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch team members");
    }
  };
  
  const inviteMember = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!currentTeam) {
      toast.error("No team selected");
      return;
    }
  
    if (!isTeamOwner) {
      toast.error("Only team owners can invite members");
      return;
    }
  
    setIsSendingInvite(true);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/invite`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          teamId: currentTeam._id, 
          memberEmail 
        })
      });
  
      const data = await response.json();
      if (data.success) {
        await fetchTeamMembers(currentTeam._id);
        setMemberEmail("");
        toast.success("Member invitation sent successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to invite member");
    } finally {
      setIsSendingInvite(false);
    }
  };
  
  const handleDeleteInvite = async (teamId, email) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/${teamId}/delete-invite`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        toast.success("Member removed successfully");
        setTeamMembers(prev => prev.filter(member => member.email !== email));
      } else {
        const data = await response.json();
        console.error("Failed to delete invite:", data.message);
      }
    } catch (error) {
      console.error("Error deleting invite:", error);
    }
  };
  

  const removeMember = async (emailToRemove) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    
    if (!isTeamOwner) {
      toast.error("Only team owners can remove members");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/${currentTeam._id}/remove`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberEmail: emailToRemove })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Member removed successfully");
        setTeamMembers(prev => prev.filter(member => member.email !== emailToRemove));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to remove member");
    }
  };

  useEffect(() => {
  const initializeComponent = async () => {
    setLoading(true);
    const [userDetails] = await Promise.all([getUserDetails(), getUserTeams()]);
    setUser(userDetails);
    setLoading(false);
  };
  initializeComponent();
}, []);


  useEffect(() => {
    if (currentTeam?._id) {
      fetchTeamMembers(currentTeam._id);
    }
  }, [currentTeam]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
  
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-red-500">Failed to load user details</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Username:</span>
              <span className="text-gray-600">{user.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Subscription Status:</span>
              <span className="text-gray-600">{user.subscription.status}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Credits:</span>
              <span className="text-gray-600">{user.subscription.credits}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
        </div>
        
        {user.subscription.status !== "free" && user.subscription.status !== "individual" && !hasTeam && (
          <div className="max-w-md mx-auto space-y-4">
            <input 
              type="text" 
              placeholder="Team Name" 
              value={name}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button 
              onClick={createTeam} 
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Create Team
            </button>
          </div>
        )}

        {(user.subscription.status === "free" || user.subscription.status === "individual") && (
          <div className="text-center space-y-4">
            <p className="text-red-500">Your subscription type does not allow team creation.</p>
            <button
              onClick={() => window.location.href = "/pricing"} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Go to Pricing
            </button>
          </div>
        )}

        {currentTeam && (
          <div className="mt-8 items-center space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Your Team: {currentTeam.name}</h3>
            {isTeamOwner && (
              <div className="max-w-md space-y-4">
                <input 
                  type="email" 
                  placeholder="Member Email" 
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={isSendingInvite}
                />
                <button 
                  onClick={inviteMember}
                  disabled={isSendingInvite}
                  className={`w-full p-3 rounded-lg text-white transition duration-200 ${
                    isSendingInvite 
                      ? 'bg-green-400 cursor-not-allowed' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isSendingInvite ? 'Sending Invite...' : 'Invite Member'}
                </button>
              </div>
            )}

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h4>
              {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div 
                      key={member._id || member.email} 
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg space-y-2 sm:space-y-0"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">{member.email}</span>
                        {isTeamOwner && member.email === userEmail && (
                          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-100 rounded-full">Owner</span>
                        )}
                      </div>
                      
                      {member.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <span className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm">
                            Invited
                          </span>
                          <button
                            onClick={() => handleDeleteInvite(currentTeam._id, member.email)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        isTeamOwner && member.email !== userEmail && (
                          <button 
                            onClick={() => removeMember(member.email)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition duration-200"
                          >
                            Remove
                          </button>
                        )
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No team members yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
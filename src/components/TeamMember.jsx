import './TeamMember.css';

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function TeamMember({ name, role }) {
  return (
    <div className="team-member">
      <span className="team-member-avatar">{getInitials(name)}</span>
      <span className="team-member-name">{name}</span>
      {role && <span className="team-member-role">{role}</span>}
    </div>
  );
}

export default TeamMember;

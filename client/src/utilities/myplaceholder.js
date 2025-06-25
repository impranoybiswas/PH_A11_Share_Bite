export const imageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
}

export const avatarError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";
}
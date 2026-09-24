import Icon from "./Icon";

export default function MiniContact() {
    return (
        <div className="mini-contact">
            <span className="help-icon"><Icon name="phone" size={16} /></span>
            <span><small>Need help?</small><strong>+996 247-1680</strong></span>
        </div>
    )
}
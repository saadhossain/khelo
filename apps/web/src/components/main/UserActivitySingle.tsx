import { Link } from 'react-router-dom';
import { DateOptionsType } from '../../types/DateOptionsType';
import { UserActivityType } from '../../types/UserActivityType';

const UserActivitySingle = ({ activity }: { activity: UserActivityType }) => {
    const date = new Date(activity.createdAt);
    const options: DateOptionsType = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });

    return (
        <div>
            <div className='bg-secondary p-3 rounded text-white mb-3'>
                <div className='flex gap-2'>
                    <p>You have just <strong className='text-accent'>{activity.action}</strong> <strong className='text-accent font-semibold uppercase hover:border-b-2 border-accent ease-in-out'><Link to={`/game/${activity.game_id}`}>{activity.game_name}</Link></strong>, on <strong className='text-accent'>{formattedDate}</strong> at <strong className='text-accent'>{formattedTime}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default UserActivitySingle;
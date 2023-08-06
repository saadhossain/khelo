import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loader/Loading';
import UserActivitySingle from '../../components/main/UserActivitySingle';
import { useGetUsersActivityQuery } from '../../redux/api/userApi';
import { filterActivity } from '../../redux/slices/activitySlice';
import { RootState } from '../../redux/store';
import { UserActivityType } from '../../types/UserActivityType';

const MyActivity = () => {
    const { refetch, isFetching } = useGetUsersActivityQuery(null);
    const dispatch = useDispatch()
    const userActivity = useSelector((state: RootState) => state.activity.userFilteredActivity)
    return (
        <div className='my-10 min_full_screen'>
            <div className='flex justify-between items-center'>
                <h1 className="ml-5 md:ml-0 mb-5 text-xl md:text-3xl font-semibold text-white ">
                    My Activities
                </h1>
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-2 items-center'>
                        <p className='text-white font-semibold'>Filter</p>
                        <select className='py-1 px-3 rounded outline-none bg-secondary text-white' onChange={(e) => dispatch(filterActivity(e.target.value))}>
                            <option value="all">All</option>
                            <option value="plays">Plays</option>
                            <option value="likes">Likes</option>
                            <option value="shares">Shares</option>
                            <option value="clone">Clone</option>
                            <option value="generate">Genarate</option>
                            <option value="update-profile">Profile Update</option>
                        </select>
                    </div>
                    <button onClick={() => refetch()} className='py-1 px-3 rounded bg-accent text-white'>Refresh</button>
                </div>
            </div>
            {
                isFetching
                    ? <Loading />
                    : <>
                        {
                            userActivity.length > 0 ? userActivity.map((activity: UserActivityType) => <UserActivitySingle activity={activity} key={activity.id} />) :
                                <div>
                                    <h1 className="mt-20 mb-5 text-lg md:text-2xl font-semibold text-white text-center">No Activity Found in this Criteria...
                                    </h1>
                                </div>

                        }
                    </>
            }
        </div>
    );
};

export default MyActivity;
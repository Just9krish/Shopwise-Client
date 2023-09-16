import { useAppSelector } from '../../../hooks';
import { selectShopEvents } from '../../../redux/features/Events/eventSlice';
import { host } from '../../../server';

export default function OngoingShopEvents() {
  const shopEvents = useAppSelector(selectShopEvents);

  return (
    <div>
      {shopEvents.length > 0 ? (
        <div className="space-y-3">
          {shopEvents.map((event) => (
            <div key={event._id}>
              <div className="h-32 w-32 rounded">
                <img
                  className="h-full w-full object-cover"
                  src={`${host}/${event.images[0]}`}
                  alt={event.name}
                />
              </div>
              <div>
                <h5>{event.name}</h5>
                <div>
                  <span>Ending time :</span>
                  <span>{new Date(event.endDate).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full w-full">
          <p className="text-center text-gray-900">No ongoing events</p>
        </div>
      )}
    </div>
  );
}

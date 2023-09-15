import loadable from '@loadable/component';
import { useAppSelector } from '../../hooks';
import style from '../../styles/style';
import { selectAllEvents } from '../../redux/features/Events/eventSlice';

const EventCard = loadable(() => import('./EventCard/EventCard'));

export default function Events() {
  const events = useAppSelector(selectAllEvents);

  if (events.length === 0) return null;

  const currentDate = new Date();

  const expiringSoonEvent = events.reduce((closestEvent, currentEvent) => {
    const endDate = new Date(currentEvent.endDate);
    const closestEndDate = new Date(closestEvent.endDate);

    if (endDate > currentDate && (closestEndDate === null || endDate < closestEndDate)) {
      return currentEvent;
    }

    return closestEvent;
  }, events[0]);

  return (
    <section className="">
      <div className={`${style.section}`}>
        <h1 className={`${style.heading}`}>Ending Soon Event</h1>
        <div className="bg-white w-full">
          <EventCard event={expiringSoonEvent} />
        </div>
      </div>
    </section>
  );
}

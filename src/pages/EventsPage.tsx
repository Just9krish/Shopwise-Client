import loadable from "@loadable/component";
import style from "../styles/style";
import { useAppSelector } from "../hooks";
import { selectAllEvents } from "../redux/features/Events/eventSlice";
const EventCard = loadable(
  () => import("../components/Events/EventCard/EventCard")
);

export default function EventsPage() {
  const events = useAppSelector(selectAllEvents);

  return (
    <section className="mt-20">
      <div className={`${style.section}`}>
        <div className="grid gap-5">
          {events?.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

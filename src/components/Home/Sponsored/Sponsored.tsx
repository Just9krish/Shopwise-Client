import style from '../../../styles/style';
import SponsoredImages from '../../../utils/SponserImage';

export default function Sponsored() {
  return (
    <section>
      <div
        className={`${style.section} bg-white py-8 px-5 my-12 cursor-pointer rounded-md shadow-md`}>
        <div className="flex justify-center md:justify-between flex-wrap gap-5 w-full items-center">
          {SponsoredImages?.map((sponsor) => (
            <div key={sponsor.id}>
              <img
                loading="lazy"
                src={sponsor.src}
                className="w-40 object-contain"
                alt="sponsor name"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

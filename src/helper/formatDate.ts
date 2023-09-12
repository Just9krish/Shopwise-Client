export default function formateDate(datestr: Date) {
  const date = new Date(datestr);
  return date.toLocaleDateString();
}

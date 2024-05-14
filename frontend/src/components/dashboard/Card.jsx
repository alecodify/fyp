
const Card = ({ seats, heading, icon }) => {
  return (
    <div className="flex justify-between items-center h-36 w-48 lg:h-48 lg:w-80 bg-green-200">
      <div className="mx-4">
        <h1 className="text-2xl lg:text-5xl font-bold">{seats}</h1>
        <p className="text-sm lg:text-md font-medium">{heading}</p>
      </div>

      <div className="mr-5 lg:mr-6 flex items-center">
        <div>{icon}</div>
      </div>
    </div>
  );
};

export default Card;

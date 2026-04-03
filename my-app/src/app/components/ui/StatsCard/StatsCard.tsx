import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import './StatsCard.css';

interface StatsCardProps {
  label: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  subLabel: string;
}

const StatsCard = ({ label, value, trend, trendPositive, subLabel }: StatsCardProps) => {
  return (
    <div className="StatsCard">
      <p className="StatsCard__label">{label}</p>
      <p className="StatsCard__value">{value}</p>
      <div className={`StatsCard__trend StatsCard__trend--${trendPositive ? 'up' : 'down'}`}>
        <span>{trend} vs last month</span>
        {trendPositive
          ? <MdTrendingUp size={18} />
          : <MdTrendingDown size={18} />
        }
      </div>
      <p className="StatsCard__sublabel">{subLabel}</p>
    </div>
  );
};

export default StatsCard;

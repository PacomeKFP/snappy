import { useState } from "react";
import { User } from "lucide-react";

type AvatarProps = {
	src?: string;
	alt?: string;
	size?: number;
};

const Avatar = ({
	src,
	alt = "Profile",
	size = 12,
}: AvatarProps): JSX.Element => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<div
			className={`w-${size} h-${size} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden`}
		>
			{!imageError && src ? (
				<img
					src={src}
					alt={alt}
					className="w-full h-full object-cover"
					onError={handleImageError}
				/>
			) : (
				<User size={(size * 8) / 3} className="text-gray-500" />
			)}
		</div>
	);
};

export default Avatar;

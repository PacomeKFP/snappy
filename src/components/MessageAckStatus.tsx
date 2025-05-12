import { Check } from "lucide-react";
import { MessageAckEnum } from "@/lib/models";

const MessageAckStatus = ({ ack }: { ack: MessageAckEnum | undefined }) => {
	if (!ack) return null;

	switch (ack) {
		case MessageAckEnum.SENT:
			return (
				<div className="ml-2 flex items-center text-snappy-gray">
					<Check size={16} />
				</div>
			);

		case MessageAckEnum.RECEIVED:
			return (
				<div className="ml-2 flex items-center text-snappy-gray">
					<Check size={16} className="-mr-1" />
					<Check size={16} />
				</div>
			);

		case MessageAckEnum.READ:
			return (
				<div className="ml-2 flex items-center text-snappy-purple">
					<Check size={16} className="-mr-1" />
					<Check size={16} />
				</div>
			);

		default:
			return null;
	}
};

export default MessageAckStatus;

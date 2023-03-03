import React from 'react';

interface ICommentUser {
	id: string;
	avatar: string;
	lastName: string;
	firstName: string;
}

interface IParentComment {
	id: string;
	body: string;
	user: ICommentUser;
	subComments: Array<ICommentUser>;
}
export const ParentComment: React.FC<IParentComment> = ({
	id,
	body,
	user,
	subComments,
}) => {
	return <></>;
};

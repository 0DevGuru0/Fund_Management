import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';
import { sendEmail } from '$service/messages/sendEmail';

interface Query {
  username: string;
  [key: string]: string | string[];
}

const maxPass = 1048576;
const getUserApi: ApiHandler<any, boolean, Query> = async (req) => {
  const { username } = req.query;
  const prisma = await getBackendPrisma();

  const users = await prisma.userMD.findMany({
    where: {
      username,
    },
  });
  if (users.length === 0) {
    return false;
  }
  const newPassword = Math.floor(Math.random() * maxPass).toString();
  await prisma.userMD.update({
    where: {
      username,
    },
    data: {
      password: newPassword,
    },
  });
  await sendEmail(
    [{ email: username }],
    `your new password is '${newPassword}'`,
    {
      from: 'smartfund@iknito.com',
      subject: 'reset password',
      type: 'email',
    },
    {},
  );
  return true;
};

export default withMiddleware(getUserApi)({
  operationId: 'resetUser',
  description: 'reset user',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        format: 'email',
        openApiIn: 'query',
      },
    },
    required: ['username'],
  },
  response: {
    type: 'boolean',
  },
});

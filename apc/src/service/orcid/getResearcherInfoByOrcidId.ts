import got from 'got';

const baseOrcidUrl = 'https://orcid.org';

export const getResearcherInfoByOrcidId = async (
  orcidId: string,
): Promise<Record<string, any> | null> => {
  try {
    const { body: researcherInfo } = await got(`${baseOrcidUrl}/${orcidId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return JSON.parse(researcherInfo);
  } catch (error) {
    return null;
  }
};

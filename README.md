# Nicasource - Videos Creator (Backend)

This is the **backend** for the “Videos Creator Platform” project, where new video creators can upload (video URL) new videos, sign up, list the available videos and video creators. You’ll have the ability to like videos and follow other video creators.

## Installation

### Docker
> Make sure you have Docker installed

1. Duplicate `.env.example` as `.env` and make sure the database credentials (`POSTGRES_*`) match the `environment` section in the `compose.yml` file and the database service's name
2. Execute `docker compose up -d`
3. Go to http://localhost:3000/status on your browser (change port if needed)
4. ... Profit?

## Notes
- As mentioned in the PDF, a pub/sub-like mechanism (Typeorm Subscribers) for follows was implemented and outputs the ids of the follower/creator to the console
- For a better experience, please use full length Youtube video URLs for the videos `srcUrl` property. This way, the frontend may look nicer.
- Keep in mind that there is a rate limit of **100 requests** every **5 minutes**
- The hashing library being used is the award winner [argon2](https://github.com/ranisalt/node-argon2). Depending on your system, you may or may not have issues with the bindings, since it doesn't have prebuilt binaries for all systems. If issues arise, please check the [Before installing](https://github.com/ranisalt/node-argon2#before-installing) section of argon2 docs

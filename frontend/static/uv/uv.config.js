self.__uv$config = {
    prefix: `/geogame/service/`,
    bare: `/bare/`,
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: `/geogame/uv/uv.handler.js`,
    bundle: `/geogame/uv/uv.bundle.js`,
    config: `/geogame/uv/uv.config.js`,
    sw: `/geogame/uv/uv.sw.js`,
};
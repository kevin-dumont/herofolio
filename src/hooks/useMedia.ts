import useSizes from '@hooks/useSizes';

type GetSizes<P extends unknown> = (width: number, height: number) => P;

const useMedia = <P extends unknown = {}>(getSizes: GetSizes<P>): P => {
  const { width, height } = useSizes();

  return getSizes(width, height);
};

export default useMedia;

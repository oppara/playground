absMayby x =
    case x of
      Nothing -> 0
      Just x | x < 0 -> -x * 2
        | otherwise -> x

main = do
    print (absMayby Nothing)
    print (absMayby (Just 5))
    print (absMayby (Just (-5)))

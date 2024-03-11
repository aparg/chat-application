import sys
def export_value(get_message):
    from model1 import classify1
    from model2 import classify2
    from model3 import classify3
    from model4 import classify4
    from model5 import classify5
    from model6 import classify6
    from model7 import classify7
    from model8 import classify8
    from model9 import classify9

    classify1_value=classify1(get_message)
    classify2_value=classify2(get_message)
    classify3_value=classify3(get_message)
    classify4_value=classify4(get_message)
    classify5_value=classify5(get_message)
    classify6_value=classify6(get_message)
    classify7_value=classify7(get_message)
    classify8_value=classify8(get_message)
    classify9_value=classify9(get_message)

    if classify1_value or classify2_value or classify3_value or\
        classify4_value or classify5_value or classify6_value or\
        classify7_value or classify8_value or classify9_value:
        print(True)
    else: 
        print(False)
    
export_value(sys.argv[1])
sys.stdout.flush()   